const router = require('express').Router();
const {api} = require('../services/axios');
const Workflow = require('../model/Workflow');
const workflow = require('../model/Workflow');

class Route {
    path;
    method;
    params;
    constructor(path, method, params){
        Object.assign(this, {path, method, params})
    }
}

router.get('/',(req,res)=>{
    const routes = [
        new Route('/org/<org-name>/daily-runs/<workflow-id?>', 'GET', ['org-name', 'workflow-id']),
        new Route('/refresh-data/', 'POST')
    ]

    return res.status(200).json(routes);
})

router.get('/org/:orgName/daily-runs/:workflowId?', async (req,res)=> {
    const {orgName, workflowId} = req.params;
    try {
        const {data: repos} = await api.get(`/orgs/${orgName}/repos`);
        const date = new Date();
        date.setHours(0,0,0,0);
        dateISO = date.toISOString();
        const lastIndex = dateISO.lastIndexOf(0);
        dateISO = dateISO.slice(0,lastIndex) + dateISO.slice(lastIndex+1,dateISO.length)
        const workFlowPromises = repos.map((currentRepo)=> {
            const path = workflowId ? `/repos/${orgName}/${currentRepo.name}/actions/workflows/${workflowId}/runs` :
            `/actions/workflows/${workflowId}/runs/actions/runs`
            return api.get(path,{
                params: {
                    created: `>=${dateISO}`
                }
            })
        })
        
        let workflowRunsRes = await Promise.all(workFlowPromises);

        const workflowRunsArr = [];
        workflowRunsRes = workflowRunsRes.filter((workflowRun)=>workflowRun.data.total_count)
        for(const wf  of workflowRunsRes){
            wf.data.workflow_runs.forEach(workFlowRun => {
                const w = new Workflow({
                    "workflowId": workFlowRun.workflow_id,
                    "workflowName":workFlowRun.name,
                    "workflowPath":workFlowRun.workflow_url,
                    "workflowRunId":workFlowRun.id,
                    "status":workFlowRun.status,
                    "conclusion":workFlowRun.conclusion,
                    "runAt":new Date(workFlowRun.run_started_at).valueOf(),
                    "repoId":workFlowRun.repository.id,
                    "repoName":workFlowRun.repository.name,
                    "ownerId":workFlowRun.repository.owner.id,
                    "ownerName":workFlowRun.repository.owner.login,
                    "branch":workFlowRun.head_branch,
                    "commitSHA":workFlowRun?.head_commit.id
                })
                workflowRunsArr.push(w);
            });
        }
        
        await Workflow.collection.insertMany(workflowRunsArr);
        return res.json(workflowRunsArr);

    } catch (error) {
        console.log(error);
        return res.status(error.response.status).json(error.message);
    }
})

router.post('/refresh-data', (req,res)=> {

})

module.exports = router
