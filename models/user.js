var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local : {
        username: String,
        password: String
    },

    twitter : {
        id: String,
        token: String,
        displayName: String,
        username: String
    },

    signupDate : { type: Date, default: Date.now() },

    favorites : {
        color: String,
        luckyNumber: Number
    }

});

userSchema.methods.generateHash = function(password) {
    // Generate salted hash of plaintext password
    // A hash is a one-way function. can turn passwords
    // into hashes, but not the other way round.
    // A password will always turn into the same hash.
    // Saving the hash, and not the password, keeps the password secret.

    // Salt is a method of adding more variation to the hashes generated.
    // Without salt, if my password is 'kittens' and your password is
    // also 'kittens', the hashes will be the same. So if you had access
    // to the password database, you'd know that anyone with the same hash
    // as you, has the same password as you.

    // With salt, a random value - the salt - is attached to the password,
    // and then random+password are hashed. This means that if you and me both
    // happen to have the same password, your password's hash will be different to mine.
    // The salt value is stored together with the hash.
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password) {

    // Create hash of password entered, compare to stored hash.
    // If hashes match, the passwords used to create them were the same.
    return bcrypt.compareSync(password, this.local.password);
};

User = mongoose.model('User', userSchema);

module.exports = User;
