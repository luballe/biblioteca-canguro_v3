'use strict';
const create = async (userid) => {
  try {
    console.log('OK Password. Creating session...')

    console.log('userid:',userid)

    // return res.status(200).send('OKi doki');
    // res.sendFile(path.join(__dirname + '../../../static/main/index.html'));
    return 
  } catch (e) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: e.message,
    });
  }
};

module.exports = create;
