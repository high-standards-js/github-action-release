const yaml = require('js-yaml');

function addStep(workflowObject, jobName, stepName, stepOrder, config = {}) {
    const steps = workflowObject.jobs[jobName].steps;
    if (!stepExisting(stepName, stepOrder)) {
        steps.push({
            name: buildStepName(stepName, stepOrder),
            ...config
        });
    }
    sortSteps(steps);
    return workflowObject;
}

function getWorkflowFile(workflowName = 'release') {
    return base.getFile(
        `.github/workflows/${workflowName}.yml`,
        true,
        base.getTemplate(
            __dirname, 
            'release.yml'
        )
    );
}

function getWorkflowFileObject(workflowName = 'release') {
    return yaml.load(
        getWorkflowFile(workflowName)
    );
}

function sortSteps(steps) {
    steps.sort((a, b) => {
        const aOrder = extractOrder(a.name);
        const bOrder = extractOrder(b.name);
        return aOrder - bOrder;
    })
    return steps;
}

function stepExisting(stepName, stepOrder) {
    return !!steps.find((singleStep) => {
        return singleStep.name === buildStepName(stepName, stepOrder);
    })
}

function extractOrder(fullStepName) {
    return fullStepName.split('#')[1];
}

function buildStepName(stepName, stepOrder) {
    return `${stepName} #${stepOrder}`;
}

module.exports = {
    addStep,
    getWorkflowFile,
    getWorkflowFileObject,
}