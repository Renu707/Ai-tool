import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tool } from "@/types";
import { ArrowRight, Plus, X, Check, Clock, Settings, Save } from "lucide-react";

interface WorkflowStep {
  id: string;
  tool: Tool;
  description: string;
  status: "pending" | "in-progress" | "completed";
  estimatedTime: string;
  notes: string;
}

interface CustomWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  createdAt: string;
  lastUpdated: string;
}

export default function WorkflowVisualizer() {
  const [workflows, setWorkflows] = useState<CustomWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<CustomWorkflow | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [newWorkflowDescription, setNewWorkflowDescription] = useState("");

  const createNewWorkflow = () => {
    if (!newWorkflowName.trim()) return;

    const newWorkflow: CustomWorkflow = {
      id: Date.now().toString(),
      name: newWorkflowName,
      description: newWorkflowDescription,
      steps: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setWorkflows([...workflows, newWorkflow]);
    setSelectedWorkflow(newWorkflow);
    setIsCreating(false);
    setNewWorkflowName("");
    setNewWorkflowDescription("");
  };

  const addStep = (workflow: CustomWorkflow, tool: Tool) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      tool,
      description: "",
      status: "pending",
      estimatedTime: "30 mins",
      notes: ""
    };

    const updatedWorkflow = {
      ...workflow,
      steps: [...workflow.steps, newStep],
      lastUpdated: new Date().toISOString()
    };

    setWorkflows(workflows.map(w => 
      w.id === workflow.id ? updatedWorkflow : w
    ));
    setSelectedWorkflow(updatedWorkflow);
  };

  const updateStepStatus = (workflowId: string, stepId: string, status: WorkflowStep["status"]) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id !== workflowId) return workflow;

      return {
        ...workflow,
        steps: workflow.steps.map(step => 
          step.id === stepId ? { ...step, status } : step
        ),
        lastUpdated: new Date().toISOString()
      };
    }));
  };

  const updateStepNotes = (workflowId: string, stepId: string, notes: string) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id !== workflowId) return workflow;

      return {
        ...workflow,
        steps: workflow.steps.map(step => 
          step.id === stepId ? { ...step, notes } : step
        ),
        lastUpdated: new Date().toISOString()
      };
    }));
  };

  const deleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter(w => w.id !== workflowId));
    if (selectedWorkflow?.id === workflowId) {
      setSelectedWorkflow(null);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Interactive Workflows</h2>
          <p className="text-gray-600">Create and track your custom AI tool workflows</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" /> Create Workflow
        </Button>
      </div>

      {isCreating && (
        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workflow Name
              </label>
              <input
                type="text"
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., Content Creation Pipeline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={newWorkflowDescription}
                onChange={(e) => setNewWorkflowDescription(e.target.value)}
                placeholder="Describe your workflow process..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={createNewWorkflow}>
                Create Workflow
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow) => (
          <Card
            key={workflow.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedWorkflow?.id === workflow.id
                ? "border-primary-500 bg-primary-50"
                : "hover:border-primary-300"
            }`}
            onClick={() => setSelectedWorkflow(workflow)}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{workflow.name}</h3>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWorkflow(workflow.id);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{workflow.steps.length} steps</span>
                  <span>
                    {new Date(workflow.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {workflow.steps.map((step) => (
                    <div
                      key={step.id}
                      className={`w-2 h-2 rounded-full ${
                        step.status === "completed"
                          ? "bg-green-500"
                          : step.status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedWorkflow && (
        <Card className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{selectedWorkflow.name}</h3>
              <p className="text-gray-600">{selectedWorkflow.description}</p>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" /> Workflow Settings
            </Button>
          </div>

          <div className="space-y-6">
            {selectedWorkflow.steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-grow space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{step.tool.name}</h4>
                      <p className="text-sm text-gray-600">
                        {step.tool.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {step.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add notes about this step..."
                      value={step.notes}
                      onChange={(e) =>
                        updateStepNotes(selectedWorkflow.id, step.id, e.target.value)
                      }
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button
                          variant={step.status === "pending" ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            updateStepStatus(selectedWorkflow.id, step.id, "pending")
                          }
                        >
                          Pending
                        </Button>
                        <Button
                          variant={
                            step.status === "in-progress" ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            updateStepStatus(
                              selectedWorkflow.id,
                              step.id,
                              "in-progress"
                            )
                          }
                        >
                          In Progress
                        </Button>
                        <Button
                          variant={step.status === "completed" ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            updateStepStatus(selectedWorkflow.id, step.id, "completed")
                          }
                        >
                          Completed
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Save className="w-4 h-4 mr-2" /> Save Notes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>
              Close Workflow
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Step
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
} 