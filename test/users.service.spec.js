const expect = require('chai').expect;
const usersService = require('../src/services/users.service');
const Q = require('q');

describe('Test Users Service', () => {
    let service = usersService;

    it(' "insertUserData" should return "Insertion success"', () => {
        let deferred = Q.defer();
        let userData = {"ulCode":12345,"serviceName": "unitTest", "projectName": "unitTest", "firstName": "unitTest", "lastName": "unitTest", "email": "unitTest" };
        let result = 'Insertion success';
        let returnResult = service.insertOne(userData, deferred);
        return returnResult.promise.then(function(data){
            expect(data).to.deep.equal(result);
        });
    });

    it(' "getAllUsers" should return all data in table "users"', () => {
        let result = [  {"ul_code":12345,"service_name": "unitTest", "project_name": "unitTest", "first_name": "unitTest", "last_name": "unitTest", "email": "unitTest" },
                        {"ul_code":51450,"service_name":"FAC","project_name":"Front end Accounting","first_name":"Supakan","last_name":"Siwatmongkol","email":"supakansiw@gosoft.co.th"},
                        {"ul_code":51450,"service_name":"FAC","project_name":"Front-end Framework","first_name":"Supakan","last_name":"Siwatmongkol","email":"supakansiw@gosoft.co.th"}
                     ];
        let returnResult = service.getAllUsers();
        return returnResult.then(function(data){
            expect(data).to.deep.equal(result);
        });
    });

    it(' "getAllProjectByEmail" should return all project of specify email', () => {
        let userEmail = 'supakansiw@gosoft.co.th';
        let result = [  {"ul_code":51450,"service_name":"FAC","project_name":"Front end Accounting","first_name":"Supakan","last_name":"Siwatmongkol","email":"supakansiw@gosoft.co.th"},
                        {"ul_code":51450,"service_name":"FAC","project_name":"Front-end Framework","first_name":"Supakan","last_name":"Siwatmongkol","email":"supakansiw@gosoft.co.th"}
                     ];
        let returnResult = service.getAllProjectByEmail(userEmail);
        return returnResult.then(function(data){
            expect(data).to.deep.equal(result);
        });
    });

    it(' "deleteUser" should return "Deletion success"', () => {
        let deferred = Q.defer();
        var userParam = {"ulCode":12345,"serviceName":"unitTest","projectName":"unitTest","email":"unitTest"};
        let result = 'Deletion success';
        let returnResult = service.deleteOne(userParam, deferred);
        return returnResult.promise.then(function(data){
            expect(data).to.deep.equal(result);
        });
    });

    it(' "getExistingUserInSomeProject" should return Query String', () => {
        var userParam = {"ulCode":12345,"serviceName":"unitTest","projectName":"unitTest","email":"unitTest"};
        let result = "SELECT * FROM users WHERE `ul_code` = 12345 AND `service_name` = 'unitTest' AND `project_name` = 'unitTest' AND `email` = 'unitTest'";
        let returnResult = service.getExistingUserInSomeProject(userParam);
        expect(returnResult).to.equal(result);
    });
    
    it(' "createUser" should return "Insertion success"', () => {
        let userData = {"ulCode":12345,"serviceName": "unitTest2", "projectName": "unitTest2", "firstName": "unitTest2", "lastName": "unitTest2", "email": "unitTest2" };
        let result = 'Insertion success';
        let returnResult = service.createUser(userData);
        return returnResult.then(function(data){
            expect(data).to.deep.equal(result);
        });
    });
    
    it(' "deleteUser" should return "Deletion success"', () => {
        let userData = {"ulCode":12345,"serviceName": "unitTest2", "projectName": "unitTest2", "email": "unitTest2" };
        let result = 'Deletion success';
        let returnResult = service.deleteUser(userData);
        return returnResult.then(function(data){
            expect(data).to.deep.equal(result);
        });
    });
});