module.exports = function(api) {
  api.cache(true);
  return {
        plugins: [
          [
            'inline-dotenv',
            {
              moduleName: '@env',
              path: '.env',
              lacklist: null,
              whitelist: null,
              safe: false,
              allowUndefined: true,
            }
          ]
        ]
      }
    }



