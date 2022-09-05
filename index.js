/*
 * File: index.js                                                              *
 * Project: educative-apigateway-33-simplechat                                 *
 * Created Date: 04 Sep 2022                                                   *
 * Author: Vikas K Solegaonkar (vikas@crystalcloudsolutions.com)               *
 * Copyright (c) 2022 Vikas K Solegaonkar                                      *
 * Crystal Cloud Solutions (https://crystalcloudsolutions.com)                 *
 *                                                                             *
 * Last Modified: Mon Sep 05 2022                                              *
 * Modified By: Vikas K Solegaonkar                                            *
 *                                                                             *
 * HISTORY:                                                                    *
 * ----------	---	---------------------------------------------------------    *
 * Date      	By	Comments                                                     *
 * ----------	---	---------------------------------------------------------    *
 */

const AWS = require("aws-sdk");

exports.handler = async (event) => {
  if (event.requestContext.routeKey === "$default") {
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: `https://${event.requestContext.apiId}.execute-api.us-east-1.amazonaws.com/v1`,
    });
    await apigwManagementApi
      .postToConnection({
        ConnectionId: event.requestContext.connectionId,
        Data: event.body,
      })
      .promise();
  }
  return { statusCode: 200, body: event.body || "{}" };
};
