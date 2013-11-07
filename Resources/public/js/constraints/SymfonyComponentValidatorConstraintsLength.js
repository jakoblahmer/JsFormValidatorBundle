/**
 * Checks minimum and maximum length
 * @constructor
 * @author dev.ymalcev@gmail.com
 */
function SymfonyComponentValidatorConstraintsLength() {
    this.maxMessage = '';
    this.minMessage = '';
    this.exactMessage = '';
    this.max = null;
    this.min = null;

    this.validate = function(value) {
        if (this.isEmtyValue(value)) {
            return;
        }

        var length = value.length;
        if (this.max === this.min && length !== this.min) {
            this.addError(value, this.exactMessage);
            return;
        }
        if (!isNaN(this.max) && length > this.max) {
            this.addError(value, this.maxMessage);
            return;
        }
        if (!isNaN(this.min) && length < this.min) {
            this.addError(value, this.minMessage);
        }
    };

    this.onCreate = function() {
        this.min = parseInt(this.min);
        this.max = parseInt(this.max);

        this.minMessage = this.transChoice(this.minMessage, this.min, {
            '{{ limit }}': this.min
        });
        this.maxMessage = this.transChoice(this.maxMessage, this.max, {
            '{{ limit }}': this.max
        });
        this.exactMessage = this.transChoice(this.exactMessage, this.min, {
            '{{ limit }}': this.min
        });
    }
}
SymfonyComponentValidatorConstraintsLength.prototype = new FpJsConstraintModel();