import { Sequelize } from "sequelize";
import * as dotenv from "dotenv-extended";
import { db } from "../sequelize";
import { makeResult } from "../sockets/helper/vote";
const path = require("path");

const intializeDB = async () => {
  await db.sync();
};

// const testUploadVote = async () => {
//     const votes = { "john": String, "0046": String, [{ "001": String, True: Boolean }, { "002": String, True: Boolean }]};
//     await createVoteQueryPerUser(votes);
// };

let data = {
  "1": 2,
  "2": 3
};

// let datastring = JSON.stringify(data);

// const testGetHawker = async () => {
//   const sth = await getHawkerCenter(datastring);
//   return sth;
// };
// const testGetStallName = async () => {
//   const sth = await getStallName(datastring);
//   return sth;
// };

const testresult = async () => {
  const sth = await makeResult("OPuSFrAJW", 5);
  return sth;
};

intializeDB().then(testresult);
// .then(testGetStallName)
//   .then(roomcode => {
//     if (roomcode) {
//       joinRoomQuery("alvin", roomcode);
//     } else {
//       console.log("no room code returned");
//     }
//   });
