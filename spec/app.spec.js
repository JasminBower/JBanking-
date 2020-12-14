const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("API", () => {
	describe("/transactions", () => {
		describe("POST", () => {
			it("Status 201, successful post", () => {
				return request(app)
					.post("/transactions")
					.send({ amount: "12.70", timestamp: new Date( )})
					.expect(201)
					.then(({body}) => {
						expect(body).to.eql({})
					});
				
			});
			it("Status 201, successful post, can handle negative transactions", () => {
				return request(app)
					.post("/transactions")
					.send({ amount: "-12.00", timestamp: new Date( )})
					.expect(201)
					.then(({body}) => {
						expect(body).to.eql({})
					});
				
			});
			it("status 204 if transaction is older than 60s", () => {
				return request(app)
				.post("/transactions")
				.send({ amount: "13.24", timestamp: "2018-07-17T09:59:51.312Z" })
				.expect(204)
					.then(({body}) => {
						expect(body).to.eql({})
					});
				
			});
				it("status 204 if transaction is older than 60s", () => {
				return request(app)
				.post("/transactions")
				.send({ amount: "12.5678", timestamp: "2019-08-17T09:59:51.312Z" })
				.expect(204)
					.then(({body}) => {
						expect(body).to.eql({})
					});
				
			});
			it("status 201 if transaction is less than 60s old", () => {
				return request(app)
				.post("/transactions")
				.send({ amount: "12.00", timestamp: new Date()})
				.expect(201)
				.then(({body}) => {
					 expect(body).to.be.an('Object')
				  });
			});
			it('Status 422, not parsable, invalid key', () => {
				return request(app)
				.post("/transactions")
				.send({cheese: "12.3343", timestamp: "2018-07-17T09:59:51.312Z"})
				.expect(422)
					.then(({body}) => {
						expect(body).to.eql({})
					});
			
			})
				it('Status 422, not parsable, invalid keys', () => {
				return request(app)
				.post("/transactions")
				.send({cheese: "12.3343", crackers: "2018-07-17T09:59:51.312Z"})
				.expect(422)
					.then(({body}) => {
						expect(body).to.eql({})
					});
				
			})
			it('Status 422, invalid value', () => {
				return request(app)
				.post("/transactions")
				.send({ amount: "cheese", timestamp: "2018-07-17T09:59:51.312Z" })
				.expect(422)
					.then(({body}) => {
						expect(body).to.eql({})
					});
	
			})
			it('Status 422, invalid not parsable ivalid values', () => {
				return request(app)
				.post("/transactions")
				.send({ amount: "123.45", timestamp: "apples" })
				.expect(422)
					.then(({body}) => {
						expect(body).to.eql({})
					});
				
			})
			it('Status 422, date in the future', () => {
				return request(app)
				.post("/transactions")
				.send({ amount: "12.3343", timestamp: "2022-07-17T09:59:51.312Z" })
				.expect(422)
					.then(({body}) => {
						expect(body).to.eql({})
					});
			
			})
			it('Status 400, invalid JSON', () => {
				return request(app)
				.post("/transactions")
				.send(('{"I like cheese/ me gusta el queso'))
				.type('json')
				.expect(400)
					.then(({body}) => {
						expect(body).to.eql({})
					});
			});
			it('Status 404, path not found', () => {
				return request(app)
				.post('/transactionzzz')
				.send({ amount: "12.3343", timestamp: "2022-07-17T09:59:51.312Z" })
				.expect(404)
					.then(({body}) => {
						expect(body).to.eql({})
					});
			});
			it('Status 405 invalid method', () => {
				const invalidMethods = ["put", "patch"];
					const methodPromises = invalidMethods.map((method) => {
						return request(app)
							[method]("/transactions")
							.expect(405)
					});
					return Promise.all(methodPromises);
					
			})
		});
		
	});
	describe("/statistics", () => {
		describe("GET", () => {
			it('Status 200, responds with transactions in an object', () => {
				return request(app)
				.get("/statistics")
				.expect(200)
				.then(({body}) => {
					expect(body).to.be.an('Object')
					expect(body).to.have.keys(
						"sum",
						"avg",
						"max",
						"min",
						"count"
					)
				})
			});
			it('Status 200, responds with correct computations for the last 60s', () => {
				return request(app)
				.get("/statistics")
				.expect(200)
				.then(({body}) => {
					expect(body).to.eql({
					    "sum": "12.70",
						"avg": "4.23",
						"max": "12.70",
						"min": "-12.00",
						"count": 3

					})
				})
			});
			it('Status 404, path not found', () => {
				return request(app)
				.get("/stats")
				.expect(404)
			});
			it('Status 405 invalid method', () => {
				const invalidMethods = ["put", "patch", "delete"];
					const methodPromises = invalidMethods.map((method) => {
						return request(app)
							[method]("/statistics")
							.expect(405)
					});
					return Promise.all(methodPromises);
					
			})
		})
	});
	describe('/transactions', () => {
		describe('DELETE', () => {
			it('Status 204, successful deletion', () => {
				return request(app)
				.delete("/transactions")
				.expect(204)
			});
			it('Status 404, path not found', () => {
				return request(app)
				.delete("/transcationzzzzz")
				.expect(404)
			});
		})
	})
 });

