import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";

interface SubmissionForm {
  name: string;
  description: string;
  category: string;
  url: string;
  submitterEmail: string;
  isUpdate: boolean;
  existingToolId?: string;
  updateDetails?: string;
}

const initialForm: SubmissionForm = {
  name: "",
  description: "",
  category: "",
  url: "",
  submitterEmail: "",
  isUpdate: false,
  updateDetails: "",
};

export default function ToolSubmission() {
  const [form, setForm] = useState<SubmissionForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call to submit tool
      await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API call
      setSubmitted(true);
      // Reset form after successful submission
      setForm(initialForm);
    } catch (error) {
      console.error("Error submitting tool:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: keyof SubmissionForm) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Submit a Tool</h2>
        <p className="text-gray-600">
          Help grow our directory by submitting new AI tools or suggesting updates to existing ones.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              <input
                type="checkbox"
                checked={form.isUpdate}
                onChange={(e) => handleSelectChange(e.target.checked.toString(), "isUpdate")}
                className="mr-2"
              />
              This is an update to an existing tool
            </label>
          </div>

          {!form.isUpdate && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tool Name</label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter the tool's name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe what the tool does"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={form.category}
                  onValueChange={(value) => handleSelectChange(value, "category")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <Input
                  name="url"
                  type="url"
                  value={form.url}
                  onChange={handleInputChange}
                  required
                  placeholder="https://"
                />
              </div>
            </>
          )}

          {form.isUpdate && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Update Details</label>
              <Textarea
                name="updateDetails"
                value={form.updateDetails}
                onChange={handleInputChange}
                required
                placeholder="Describe what needs to be updated"
                className="min-h-[100px]"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Email (optional)</label>
            <Input
              name="submitterEmail"
              type="email"
              value={form.submitterEmail}
              onChange={handleInputChange}
              placeholder="For attribution and updates"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Tool"}
          </Button>
        </form>
      </Card>

      {submitted && (
        <Card className="p-6 bg-green-50 border-green-200">
          <p className="text-green-800">
            Thank you for your submission! Our team will review it shortly.
          </p>
        </Card>
      )}
    </div>
  );
} 