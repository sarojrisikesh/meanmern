const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");


/*Dated 6 december 2025
** @register new user
*/
exports.register = (req, res) => {
    const { name, email,mobile, password } = req.body;

    // Check existing user
    User.findByEmail(email, (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            name,
            email,
			mobile,
            password: hashedPassword
        };

        User.create(newUser, (err) => {
            if (err) throw err;
            return res.json({ message: "Registration successful!" });
        });
    });
};

/*Dated 6 december 2025
** @Get All users list
*/
exports.getUsers = (req, res) => {
    User.getUsers((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        return res.status(200).json({
            message: "Record found successfully!",
            data: results
        });
    });
};
/*Dated 6 december 2025
** @Delete user list
*/

	exports.deleteUser = (req, res) => {
		const userId = req.params.id;

		User.deleteUser(userId, (err, results) => {
			if (err) {
				return res.status(500).json({ message: "Database error", error: err });
			}

			if (results.affectedRows === 0) {
				return res.status(404).json({ message: "User not found" });
			}

			return res.json({ message: "User deleted successfully!" });
		});
	};
/*Dated 6 december 2025
** @Update user list
*/
	exports.updateUser = (req, res) => {
		const userId = req.params.id;
		const { name, email, password } = req.body;

		// Data to update
		let updateData = { name, email };

		// If password exists, hash it
		if (password) {
			const bcrypt = require("bcryptjs");
			updateData.password = bcrypt.hashSync(password, 10);
		}

		User.updateUser(userId, updateData, (err, results) => {
			if (err) {
				return res.status(500).json({ message: "Database error", error: err });
			}

			if (results.affectedRows === 0) {
				return res.status(404).json({ message: "User not found" });
			}

			return res.json({ message: "User updated successfully!" });
		});
	};

// Login user
exports.login = (req, res) => {
    const { email, password } = req.body;

    // 1. Check empty fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Find user by email
    User.findByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        // 3. Compare password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 4. Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // 5. Send response
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
            }
        });
    });
};