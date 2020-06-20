const base = require('@high-standards-js/base');
const semanticRelease = require('@high-standards-js/semantic-release');

(async() => {
    await base.checkAcceptedHighStandards();
    base.getFile(
        '.github/workflows/release.yml',
        true,
        base.getTemplate(
            __dirname, 
            'release.yml'
        )
    );
})();
