import { EndpointSpec, EndpointSpecResponse } from "core/endpoint/types";
import {
  makeArraySchema,
  makeBooleanSchema,
  makeNullable,
  makeObjectSchema,
  makeOneOf,
  makeStringSchema,
} from "core/schemas/makeSchema";
import { optional } from "zod";
import {
  UserSchema,
  VersionHeaderParam,
  YourBotSchema,
} from "./schemas/primitives";

const errorResponse: EndpointSpecResponse = {
  success: false,
  name: "Error",
  description: "Error response",
  schema: {},
};

export const getUser: EndpointSpec = {
  path: "/users/{userId}",
  method: "GET",
  metadata: {
    name: "getUser",
    description: `Get a user's information`,
    displayProperties: {
      title: "Get user info for user id ${parameters.userId}",
    },
    externalDocs: {
      description: "API method documentation",
      url: "https://developers.notion.com/reference/get-user",
    },
    tags: ["users"],
  },
  security: {
    api_key: [],
  },
  parameters: [
    {
      name: "userId",
      in: "path",
      description: "ID of the user you would like info about",
      schema: {
        type: "string",
      },
      required: true,
    },
    VersionHeaderParam,
  ],
  request: {},
  responses: {
    200: [
      {
        success: true,
        name: "Success",
        description: "Typical success response",
        schema: UserSchema,
      },
    ],
    default: [errorResponse],
  },
};

export const listUsers: EndpointSpec = {
  path: "/users",
  method: "GET",
  metadata: {
    name: "listUsers",
    description: `Returns a paginated list of Users for the workspace. The response may contain fewer than page_size of results.`,
    displayProperties: {
      title: "List users",
    },
    externalDocs: {
      description: "API method documentation",
      url: "https://developers.notion.com/reference/get-users",
    },
    tags: ["users"],
  },
  security: {
    api_key: [],
  },
  parameters: [
    VersionHeaderParam,
    {
      name: "start_cursor",
      in: "query",
      description:
        "The cursor to start from. If not provided, the default is to start from the beginning of the list.",
      schema: {
        type: "string",
      },
      required: false,
    },
    {
      name: "page_size",
      in: "query",
      description: "The number of results to return. The maximum is 100.",
      schema: {
        type: "integer",
      },
      required: false,
    },
  ],
  request: {},
  responses: {
    200: [
      {
        success: true,
        name: "Success",
        description: "Typical success response",
        schema: makeObjectSchema("ListUsersResponse", {
          requiredProperties: {
            results: makeArraySchema("Users", UserSchema),
            has_more: makeBooleanSchema(
              "Has more",
              "Whether there are more results"
            ),
          },
          optionalProperties: {
            next_cursor: makeNullable(
              makeStringSchema(
                "Next cursor",
                "Use this to get the next page of results"
              )
            ),
            type: makeStringSchema("Type", "The type of items in the results", {
              enum: [
                "user",
                "block",
                "page",
                "database",
                "property_item",
                "page_or_database",
              ],
            }),
            object: makeStringSchema("Object", "The object type, always list", {
              enum: ["list"],
            }),
          },
        }),
      },
    ],
    default: [errorResponse],
  },
};

export const getBotInfo: EndpointSpec = {
  path: "/users/me",
  method: "GET",
  metadata: {
    name: "getBotInfo",
    description: `Get's the bots info`,
    displayProperties: {
      title: "Get the bot's info",
    },
    externalDocs: {
      description: "API method documentation",
      url: "https://developers.notion.com/reference/get-users",
    },
    tags: ["users"],
  },
  security: {
    api_key: [],
  },
  parameters: [VersionHeaderParam],
  request: {},
  responses: {
    200: [
      {
        success: true,
        name: "Success",
        description: "Typical success response",
        schema: YourBotSchema,
      },
    ],
    default: [errorResponse],
  },
};
