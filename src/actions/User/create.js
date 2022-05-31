'use strict';

const httpStatus = require('http-status');
const Constants = require('../../lib/constants');
const User = require('../../models/user');

const createUser = async (req, res) => {
  try {
    const { decodedToken } = req.locals;
    const { name, server } = req.locals.data;

    let summonerRequest;
    // try {
    //   summonerRequest = await RiotAPI.getSummonerByName(name, server);
    // } catch (e) {
    //   if (e.response.status === httpStatus.NOT_FOUND) {
    //     throw new Error(
    //       `Summoner with name '${name}' does not exist in the selected region`
    //     );
    //   }
    //   throw new Error(`There was an error getting info from Riot`);
    // }
    const summonerData = summonerRequest.data;

    const existingSummoner = await User.findOne({
      puuid: summonerData.puuid,
    });

    if (existingSummoner) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: `Summoner already exists!`,
      });
    }

    const newUser = await User.create({
      ...summonerData,
      uid: decodedToken.uid,
      email: decodedToken.email,
      type: Constants.USER_TYPES.READER,
    });

    await admin.auth().updateUser(decodedToken.uid, {
      displayName: name,
      photoURL,
    });

    return res.status(httpStatus.OK).json(newUser);
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = createUser;
