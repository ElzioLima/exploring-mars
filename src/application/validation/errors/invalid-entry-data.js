class InvalidEntryData extends Error {
    constructor() {
        super(`Invalid entry data`);
        this.name = 'InvalidEntryData';
        this.statusCode = 400;
      }
}

module.exports = InvalidEntryData