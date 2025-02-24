module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.forEach((rule) => {
          if (Array.isArray(rule.oneOf)) {
            rule.oneOf.forEach((oneOfRule) => {
              if (
                oneOfRule.test &&
                oneOfRule.test.toString().includes('scss') &&
                oneOfRule.use
              ) {
                oneOfRule.use = oneOfRule.use.map((loaderConfig) => {
                  if (
                    typeof loaderConfig === 'object' &&
                    loaderConfig.loader &&
                    loaderConfig.loader.includes('sass-loader')
                  ) {
                    return {
                      ...loaderConfig,
                      options: {
                        ...loaderConfig.options,
                        implementation: require('sass'),
                      },
                    };
                  }
                  return loaderConfig;
                });
              }
            });
          }
        });
        return webpackConfig;
      },
    },
  };
  