import { AgentClient } from "../src/AgentClient";
import { RestClient } from "../src/RestClient";
import { isValidSkillsWithPriorities } from "../src/Utils";
import { doesNotReject } from "assert";
import { SkillPriority } from "../src";

describe("AgentClient.ts", () => {
    let client: AgentClient;
    beforeEach(() => {
        // Cast to any if mocking and not fulfilling the static type
        let restClient: any = RestClient as jest.Mock
        client = new AgentClient("1", restClient)
    });
    test("createAgentAndStation throws an error given an invalid password", async () => {
        expect.assertions(1);
        let skillsWithPriorities = [{ "skillNumber": 100, "skillPriority": 5 }]
        await expect( client.createAgentAndStation("agent1", "badpassword", skillsWithPriorities)).rejects.toEqual("invalid password")
    })
    test("createAgentAndStation throws an error given an invalid username", async () => {
        expect.assertions(1);
        let skillsWithPriorities = [{ "skillNumber": 100, "skillPriority": 5 }]
        expect(client.createAgentAndStation("a", "Passw0rd@", skillsWithPriorities)).rejects.toEqual("invalid username")
    })
    test("createAgentAndStation throws an error given an invalid skills", async () => {
        expect.assertions(1);
        let skillsWithPriorities = [] as SkillPriority[]
        expect(client.createAgentAndStation("agent1", "Passw0rd@", skillsWithPriorities)).rejects.toEqual("invalid skills")
    })    
    test("generateAvayaPassword should return last 6 characters", () => {
        let actual = client.generateAvayaPassword("agentLoginId")
        expect(actual).toEqual("oginId")
    })
    test("generateAvayaPassword should return full string", () => {
        let actual = client.generateAvayaPassword("abc")
        expect(actual).toEqual("abc")
    })
    test("generateSecurityCode should return last 4 chars", () => {
        let actual = client.generateSecurityCode("securityCode")
        expect(actual).toEqual("Code")
    })
    test("generateSecurityCode should return all chars", () => {
        let actual = client.generateSecurityCode("abc")
        expect(actual).toEqual("abc")
    })
    test("stationExtension: { toString: () => any }", () => {
        let stationExtension: { toString: () => any } = "hello world"
        expect(stationExtension.toString()).toEqual("hello world")
    })
    test("redo less than max retries should return true", async () => {
        const retries = 7
        const millis = 5
        let count = 0
        const callback = () => {
            count++
            if (count < 3) {
                return Promise.resolve(false)
            }
            return Promise.resolve(true)
        }
        let result = await client.redo(callback, retries, millis)
        expect(result).toBeTruthy()
    }, 10000)
    test("redo greater than max retries should return false", async () => {
        const retries = 3
        const millis = 5
        let count = 0
        const callback = () => {
            count++
            console.log(`callback count=${count}`)
            if (count < 10) {
                console.log(`callback if count=${count}`)
                return Promise.resolve(false)
            }
            console.log(`callback outside if count=${count}`)
            return Promise.resolve(true)
        }
        let result = await client.redo(callback, retries, millis)
        expect(result).toBeFalsy()
    })
    test("checkAgentPromise should return false", async () => {
        let result = await client.existsAgent(Promise.reject(true))
        expect(result).toBeFalsy()
    })
    test("checkAgentPromise should return true", async () => {
        let result = await client.existsAgent(Promise.resolve(true))
        expect(result).toBeTruthy()
    })
})