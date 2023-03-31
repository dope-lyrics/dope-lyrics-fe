import axios, { axiosPrivate } from "@/axios/axios";
import type { ApiResponse } from "@/api/types";
import type { AddPayloadType } from "@/pages/Add/types";

type Add = {
  payload: AddPayloadType;
} & ApiResponse;

async function add({ payload, onError, onSuccess }: Add) {
  try {
    const response = await axiosPrivate.post("lyrics/add", payload);
    if (onSuccess) onSuccess(response);
  } catch (error: any) {
    console.error(error);
    if (onError) onError(error?.response?.data?.error || error);
  }
}

async function fetchLyrics(queryKey: any) {
  const { page, limit } = queryKey;

  const searchParams = new URLSearchParams();

  searchParams.append("page", page.toString() ?? "0");
  searchParams.append("limit", limit.toString() ?? "10");

  try {
    let response = await axios.get<any>(`/lyrics?${searchParams.toString()}`);

    if (response?.data?.data?.lyrics) {
      return {
        data: response.data.data.lyrics,
        hasMore: response.data.data.hasMore,
      };
    }

    throw new Error("No Data");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

async function fetchMoods() {
  try {
    let response = await axios.get<{
      data: [{ [key: string]: string }];
    }>("/lyrics/moods");
    return response?.data?.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

const LyricAPI = { add, fetchLyrics, fetchMoods };
export { LyricAPI };
