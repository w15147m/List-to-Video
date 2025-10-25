import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/api/lambda/progress": {};
  "/api/lambda/render": {};
};