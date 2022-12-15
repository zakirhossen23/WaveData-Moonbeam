
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
// Just a standard hardhat-deploy deployment definition file!
const func = async (hre) => {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();


	await deploy('WaveData', {
		from: deployer,
		log: true,
	});
	var fs = require('fs');
	var fse = require('fs-extra');
	var sourceDir = './deployments';
	var destDir = '../../../wavedata-api/contract/deployments';

	// if folder doesn't exists create it
	if (!fs.existsSync(destDir)) {
		fs.mkdirSync(destDir, { recursive: true });
	}

	let done = false;
	//copy directory content including subfolders
	fse.copy(sourceDir, destDir, function (err) {
		if (err) {
			console.error(err);
		} else {
			
		}
		done = true;
	});
	while (done == false) {
		await  sleep(1000);
		console.log("success!");
	}
};

module.exports = func;