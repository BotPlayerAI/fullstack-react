import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { useUpdateTask } from "@/hooks/useUpdateTask.hook.js";
import { useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Task(props) {
  const { mutate, isSuccess } = useUpdateTask();
  const [progress, setProgress] = useState(false);
  const queryClient = useQueryClient();

  const {
    title = "This is the default title",
    description = "This is the default description",
    status = "todo",
    priority = "normal",
    dueDate = new Date("2025-01-01T12:00:00.000Z"),
    id,
  } = props;

  let formattedDate = dueDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (status === "inProgress") {
      setProgress(true);
    }
  }, [status]);

  function handleProgressChange(value) {
    setProgress(value);
    mutate({ _id: id, status: value ? "inProgress" : "todo" });
    queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all",
    });
  }

  function handleTaskCompleted(value) {
    mutate({ _id: id, status: "completed" });
    queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all",
    });
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="basis-2/3 leading-8">{title}</CardTitle>
        <div>
          <Badge className="mr-2" variant="outline">
            {formattedDate}
          </Badge>

          {priority === "normal" && (
            <Badge className="bg-sky-800" variant="outline">
              {priority}
            </Badge>
          )}

          {priority === "high" && (
            <Badge className="bg-red-800" variant="outline">
              {priority}
            </Badge>
          )}

          {priority === "low" && (
            <Badge className="bg-green-800" variant="outline">
              {priority}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Switch
            checked={progress}
            onCheckedChange={handleProgressChange}
            id="in-progress"
          />
          <Label className="ml-4" htmlFor="in-progress">
            In Progress
          </Label>
        </div>
        <Button onClick={handleTaskCompleted}>Completed</Button>
      </CardFooter>
    </Card>
  );
}
