import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "@/context/tasks.context.jsx";
import { extractQueryString } from "@/lib/extractQueryString.js";

export function TaskPagination() {
  const [links, setLinks] = useState();
  const [meta, setMeta] = useState();
  const { tasks, setTasks } = useContext(TasksContext);

  const previousPage = links?.previous
    ? extractQueryString(links.previous).toString()
    : "#";
  const nextPage = links?.next
    ? extractQueryString(links.next).toString()
    : "#";
  const order = links?.next ? extractQueryString(links.next).get("order") : "#";

  useEffect(() => {
    if (tasks) {
      setLinks(tasks.pagination.links);
      setMeta(tasks.pagination.meta);
    }
  }, [tasks]);

  console.log(meta);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={`/tasks?${previousPage}`} />
        </PaginationItem>

        {meta &&
          [...Array(meta.totalPages)].map((item, index) => (
            <PaginationItem key={`page${index}`}>
              <PaginationLink
                to={`/tasks/?limit=${meta.itemsPerPage}&page=${
                  index + 1
                }&order=${order}`}
                isActive={index + 1 == meta.currentPage ? true : false}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext to={`/tasks?${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
