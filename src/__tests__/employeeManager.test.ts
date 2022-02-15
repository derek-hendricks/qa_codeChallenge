import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

// terminal -> npx; jest employeeManager; 
describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });

  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  }); 

  it("can add another new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "Homer Simpson",
      phone: "4033642723",
      title: "Nuclear Safety Inspector",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("Homer Simpson");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("Homer Simpson");
    expect(employee.phone).toEqual("4033642723");
    expect(employee.title).toEqual("Nuclear Safety Inspector");
  });

  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });

  it("can cancel editing an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah", name: "bob", phone: "123" });
    let editedEmployeeBeforeCancelingSave = await em.getEmployeeInfo();
    expect(editedEmployeeBeforeCancelingSave).toEqual({
      id: 1,
      title: "Grand Poobah",
      name: "bob",
      phone: "123"
    });
    await em.cancelChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "CEO",
    });
  });

  it("can edit and navigate away before clicking save and employee is not edited", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    let editedEmployeeBeforeNavigatingAway = await em.getEmployeeInfo();
    expect(editedEmployeeBeforeNavigatingAway).toEqual({
      id: 1,
      title: "Grand Poobah",
      name: "Bernice Ortiz",
      phone: "4824931093"
    });
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "CEO",
    });
  });
  it("stretch: bug found before fix - Validation error messages do not remain on page after navigating to new employee page", async () => {
    await em.selectEmployeeByName("Dollie Berry");
    await em.editEmployee({
      phone: "phonenumber"
    });
    await em.saveChanges();
   
    await em.selectEmployeeByName("Harriett Williamson");
    let errorMessage: string = await em.getErrorMessage();
    expect(errorMessage).not.toEqual("The phone number must be 10 digits long.");
  });
});

