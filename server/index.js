/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const Server = require("@etk/api-core-server");
const server = new Server();
server.configure = async function (request) {
	const sandstorm = {
		cache: {
			l1: {
				prefix: "acs_",
				client: {
					host: "redis"
				}
			},
			l2: {enforceObjectID: false}
		}
	};
	return {
		orm: {
			blueprints: {
				Author: {
					name: "String",
					last_name: "String"
				},
				Book: {
					author: "Author",
					"isbn": "String",
					title: "String",
					edition: "Number",
					released_at: {
						type: "Date",
						required: true,
						default: () => new Date()
					}
				}
			},
			connectionString: "mongodb://root:example@mongo/",
			dbName: "acs",
			sandstorm // instance or config
		},
		api: {
			middlewares: {
				Utils: {
					echo: {
						pre: [
							function (req, next) {
								this.result = req.params;
								next();
							}
						]
					},
					now: {
						pre: [
							function (req, next) {
								this.result = new Date();
								next();
							}
						]
					}
				}
			},
			scope: null,
			ctx: {}
		},
		worker: {
			state: {},
			options: {
				profile: true,
				verbose: true
			}
		}
	};
};
server.start(8001);
