import { SORT_VALUES, STATUS_STATES } from "./posts.constants";
import { Request } from "express";

type Status = (typeof STATUS_STATES)[number];
type Sort = (typeof SORT_VALUES)[number];

interface CustomPostsRequest extends Request {
	query: {
		limit: string;
		page: string;
		status: Status;
		offset: string;
		sort: Sort;
	};
}

type Query = {
	status?: Status;
};

export type { Status, Sort, CustomPostsRequest, Query };
