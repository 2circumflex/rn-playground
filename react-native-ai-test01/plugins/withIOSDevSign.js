const { withXcodeProject } = require('@expo/config-plugins');

const setManualSigning = (project, { appleTeamId, provisioningProfileSpecifier, codeSignIdentity }) => {
  const schemes = ['Debug', 'Release'];

  schemes.forEach((scheme) => {
    project.updateBuildProperty('CODE_SIGN_STYLE', 'Manual', scheme);
    project.updateBuildProperty('DEVELOPMENT_TEAM', appleTeamId, scheme);
    project.updateBuildProperty('PROVISIONING_PROFILE_SPECIFIER', `"${provisioningProfileSpecifier}"`, scheme);
    project.updateBuildProperty('CODE_SIGN_IDENTITY', `"${codeSignIdentity}"`, scheme);
  });

  return project;
};

const withIosLocaldDevSign = (config, props) => {
  return withXcodeProject(config, (config) => {
    config.modResults = setManualSigning(config.modResults, props);
    console.debug('');
    console.debug('🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌');
    console.debug('withIosLocaldDevSign');
    console.debug(`${JSON.stringify(props, null, 2)}`);
    console.debug('🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌🔌');
    console.debug('');
    return config;
  });
};

module.exports = withIosLocaldDevSign;
