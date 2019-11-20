import mongoose from 'mongoose'

const LogSchema = {
	url: String,
	type: String,
	msg: String,
	time: Date
};

const Log = mongoose.model('Log', new mongoose.Schema(LogSchema))

export default Log