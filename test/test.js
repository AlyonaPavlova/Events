const { expect } = require("chai");

const {hello, question1, question2} = require("../app");

describe("Events", function () {

  it("should return true", function () {
    expect(hello.emit("hello")).to.be.equal(true);
  })

  it("should return true", function () {
    expect(question1.emit("How are you?")).to.be.equal(true);
  })

  it("should return true", function () {
    expect(question2.emit("What are you doing?")).to.be.equal(true);
  })
});
