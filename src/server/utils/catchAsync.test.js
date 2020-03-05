import catchAsync from "./catchAsync";

describe("catchAsync", () => {

    test("It must catch error and call next function with that error", async () => {

        const req = "request";
        const res = "response";
        const next = jest.fn();

        const getReject = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("Big fat error"));
                }, 2000)
            })
        };

        const requestHandler = catchAsync(async (req, res, next) => {
            expect(req).toEqual("request");
            expect(res).toEqual("response");
            await getReject();
        }); 

       /*  const func = async (req, res, next) => {
            expect(req).toEqual("request");
            expect(res).toEqual("response");
            await getReject();
        };

        await func(req, res, next); */

        await requestHandler(req, res, next);

        expect(next).toHaveBeenNthCalledWith(1, new Error("Big fat error"));

    })

})