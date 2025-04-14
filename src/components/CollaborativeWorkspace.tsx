import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tool } from "@/types";
import { Users, MessageSquare, Share2, Save } from "lucide-react";

interface WorkspaceUser {
  id: string;
  name: string;
  avatar: string;
  role: "viewer" | "editor" | "owner";
  isOnline: boolean;
}

interface WorkspaceComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  toolId?: string;
}

interface WorkspaceItem {
  id: string;
  type: "tool" | "note" | "workflow";
  content: Tool | string;
  position: { x: number; y: number };
  connections: string[];
}

// Mock data
const mockUsers: WorkspaceUser[] = [
  {
    id: "1",
    name: "Alice Cooper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    role: "owner",
    isOnline: true
  },
  {
    id: "2",
    name: "Bob Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    role: "editor",
    isOnline: true
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    role: "viewer",
    isOnline: false
  }
];

const mockComments: WorkspaceComment[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alice Cooper",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    content: "I think we should add a text generation tool here",
    timestamp: "2 mins ago"
  },
  {
    id: "2",
    userId: "2",
    userName: "Bob Wilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    content: "Good idea! I've used this one before with great results.",
    timestamp: "1 min ago"
  }
];

export default function CollaborativeWorkspace() {
  const [users] = useState<WorkspaceUser[]>(mockUsers);
  const [comments] = useState<WorkspaceComment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [shareLink] = useState("https://compass.ai/workspace/abc123");

  const addComment = () => {
    if (!newComment.trim()) return;
    // TODO: Implement real-time comment addition
    console.log("Adding comment:", newComment);
    setNewComment("");
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    // TODO: Show success toast
  };

  const saveWorkspace = () => {
    // TODO: Implement workspace saving
    console.log("Saving workspace...");
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex">
      {/* Main Workspace Area */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">
            Drag and drop tools here to start building your workflow
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l bg-white">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Workspace</h2>
          <p className="text-sm text-gray-600">Collaborative Tool Planning</p>
        </div>

        {/* Collaborators Section */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Collaborators
            </h3>
            <Button variant="outline" size="sm">
              Invite
            </Button>
          </div>

          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        user.isOnline ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-4 border-b flex-1 overflow-auto">
          <h3 className="font-medium flex items-center mb-3">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comments
          </h3>

          <div className="space-y-4 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm font-medium">{comment.userName}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1"
            />
            <Button onClick={addComment} size="sm">
              Send
            </Button>
          </div>
        </div>

        {/* Actions Section */}
        <div className="p-4 border-t mt-auto bg-gray-50">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={copyShareLink}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Workspace
            </Button>
            <Button
              className="w-full flex items-center justify-center"
              onClick={saveWorkspace}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 