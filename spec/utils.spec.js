const {expect} = require("chai");
const {statistics} = require('../utils')


describe('statistics', () => {
    it('When passed an empty array returns an object', () => {
      const actual = statistics([]);
      expect(actual).to.be.an('Object')
    });
    it('returns object with correct keys', () => {
      const actual = statistics([]);
      expect(actual).to.contain.keys(
        "sum",
        "avg",
        "max",
        "min",
        "count"
      )
    });
    it("returns correct computation for count, number of transactions that happened in the last 60s", () => {
      const input = [{ amount: "12.70", timestamp: new Date()}, { amount: "13.24", timestamp: "2018-07-17T09:59:51.312Z" }, { amount: "12.5678", timestamp: "2019-08-17T09:59:51.312Z" }, { amount: "12.00", timestamp: new Date()}];
      const actual = statistics(input);
      expect(actual.count).to.eql(2);

    });
    it('returns correct sum of all transaction in the last 60s', () => {
      const input = [{ amount: "12.70", timestamp: new Date()}, { amount: "13.24", timestamp: "2018-07-17T09:59:51.312Z" }, { amount: "12.5678", timestamp: "2019-08-17T09:59:51.312Z" }, { amount: "12.00", timestamp: new Date()}];
      const actual = statistics(input);
      expect(actual.sum).to.eql('24.70') 
    });
    it('returns correct average of all transaction in the last 60s', () => {
      const input = [{ amount: "12.68", timestamp: new Date()}, { amount: "13.24", timestamp: "2018-07-17T09:59:51.312Z" }, { amount: "12.5678", timestamp: "2019-08-17T09:59:51.312Z" }, { amount: "12.00", timestamp: new Date()}];
      const actual = statistics(input);
      expect(actual.avg).to.eql('12.34') 
    });
    it('returns correct string of highest transaction', () => {
      const input = [{ amount: "12.70", timestamp: new Date()}, { amount: "13.24", timestamp: "2018-07-17T09:59:51.312Z" }, { amount: "12.5678", timestamp: "2019-08-17T09:59:51.312Z" }, { amount: "12.00", timestamp: new Date()}];
      const actual = statistics(input);
      expect(actual.max).to.eql('12.70')
    });
     it('returns correct string of lowest transaction', () => {
      const input = [{ amount: "12.70", timestamp: new Date()}, { amount: "13.24", timestamp: "2018-07-17T09:59:51.312Z" }, { amount: "12.5678", timestamp: "2019-08-17T09:59:51.312Z" }, { amount: "12.00", timestamp: new Date()}];
      const actual = statistics(input);
      expect(actual.min).to.eql('12.00')
    });
      it('returns correct string of lowest transaction', () => {
      const input = [{ amount: "0.09", timestamp: new Date()}, { amount: "13.24", timestamp: "2018-07-17T09:59:51.312Z" }, { amount: "12.5678", timestamp: "2019-08-17T09:59:51.312Z" }, { amount: "12.00", timestamp: new Date()}];
      const actual = statistics(input);
      expect(actual.min).to.eql('0.09')
    });
      it('original input is not mutated', () => {
      const input = [{ amount: "12.70", timestamp: "2018-07-17T09:59:51.312Z"}];
      statistics(input);
      expect(input).to.eql([{ amount: "12.70", timestamp: "2018-07-17T09:59:51.312Z"}])
    });

})
