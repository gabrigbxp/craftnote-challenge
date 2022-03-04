import type { NextFunction, Request, Response } from "express"
import { getDirection } from "../../controllers/direction"
import BusinessError from "../../errors/BusinessError"

describe("Get direction", () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const next = jest.fn()

  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let responseObject = {}
  let responseStatus = 0

  beforeEach(() => {
    responseObject = {}
    responseStatus = 0

    mockResponse = {
      status: jest.fn().mockImplementation(status => {
        responseStatus = status
        return mockResponse
      }),
      json: jest.fn().mockImplementation(result => {
        responseObject = result
        return mockResponse
      })
    }
  })

  test("Responds 200 and direction 'straight' when heading & target are the same", async () => {
    mockRequest = {
      query: { heading: "5", target: "5" }
    }

    await getDirection(mockRequest as Request, mockResponse as Response, next)

    expect(responseStatus).toBe(200)
    expect(responseObject).toEqual({ direction: "straight" })
  })

  test("Responds 200 and direction 'right' when heading = 310 & target = 75", async () => {
    mockRequest = {
      query: { heading: "310", target: "75" }
    }

    await getDirection(mockRequest as Request, mockResponse as Response, next)

    expect(responseStatus).toBe(200)
    expect(responseObject).toEqual({ direction: "right" })
  })

  test("Responds 200 and direction 'left' when heading = 265 & target = 120", async () => {
    mockRequest = {
      query: { heading: "265", target: "120" }
    }

    await getDirection(mockRequest as Request, mockResponse as Response, next)

    expect(responseStatus).toBe(200)
    expect(responseObject).toEqual({ direction: "left" })
  })

  test("Throw exception with status 400 if 'heading' is missing", async () => {
    let error!: BusinessError

    mockRequest = {
      query: {}
    }

    try {
      await getDirection(mockRequest as Request, mockResponse as Response, next)
    } catch (e) {
      error = e as BusinessError
    }

    expect(error instanceof BusinessError).toBe(true)
    expect(error.code).toBe(400)
    expect(error.message).toEqual("'heading' value is invalid, should be a number between 0 and 359")
  })

  test("Throw exception with status 400 if 'heading' is not a number", async () => {
    let error!: BusinessError

    mockRequest = {
      query: { heading: "ABC" }
    }

    try {
      await getDirection(mockRequest as Request, mockResponse as Response, next)
    } catch (e) {
      error = e as BusinessError
    }

    expect(error instanceof BusinessError).toBe(true)
    expect(error.code).toBe(400)
    expect(error.message).toEqual("'heading' value is invalid, should be a number between 0 and 359")
  })

  test("Call 'next' callback with a 'BusinessError' exception if 'target' is missing", async () => {
    mockRequest = {
      query: { heading: "123" }
    }

    await getDirection(mockRequest as Request, mockResponse as Response, next)

    const err = new BusinessError(400, "'to' field is invalid, should be a number between 0 and 359")
    expect(next).toHaveBeenCalledWith(err)
  })

  test("Call 'next' callback with a 'BusinessError' exception if 'heading' is not a number", async () => {
    mockRequest = {
      query: { heading: "123", target: "ABC" }
    }

    await getDirection(mockRequest as Request, mockResponse as Response, next)

    const err = new BusinessError(400, "'to' field is invalid, should be a number between 0 and 359")
    expect(next).toHaveBeenCalledWith(err)
  })
})
