import Note from "../models/Note"
import { requestDelete, requestGet, requestPost, requestPut } from "./index"
import { Pagination } from "../common/Types"
import Article from "../models/Article"


export const requestFindNotes = async (page: number): Promise<[Note[], Pagination]> => {
  const resp = await requestGet(`/apis/notes?page=${page}`)
  return [
    resp.data.notes,
    resp.data.pagination,
  ]
}

export const requestGetNote = async (id: number): Promise<[ Note, Article[] ]> => {
  const resp = await requestGet(`/apis/notes/${id}`)
  return [
    resp.data.note,
    resp.data.referencedArticles,
  ]
}

export const requestUpdateTitle = async (id: number, title: string): Promise<void> => {
  await requestPut(`/apis/notes/${id}/title`, {title})
}

export const requestCreateNote = async (title: string, content: string, referenceArticleIDs: number[], referenceWebURLs: string[]): Promise<Note> => {
  const resp = await requestPost(`/apis/notes`, {title, content, referenceArticleIDs, referenceWebURLs})
  return resp.data.note
}

export const requestCreateParagraph = async (id: number, content: string, referenceArticleIDs: number[], referenceWebURLs: string[]): Promise<Note> => {
  const resp = await requestPost(`/apis/notes/${id}/paragraphs`, {content, referenceArticleIDs, referenceWebURLs})
  return resp.data.note
}

export const requestFindNoteTitles = async (): Promise<Note[]> => {
  const resp = await requestGet(`/apis/notes/title`)
  return resp.data.notes
}

export const requestSearch = async (keyword: string, page: number): Promise<[Note[], Pagination]> => {
  const resp = await requestGet(`/apis/notes/search?q=${encodeURIComponent(keyword)}&page=${page}`)
  return [
    resp.data.notes,
    resp.data.pagination,
  ]
}

export const requestDeleteNote = async (id: number): Promise<void> => {
  await requestDelete(`/apis/notes/${id}`)
}

export const requestDeleteNotes = async (ids: number[]): Promise<void> => {
  await requestDelete(`/apis/notes?ids=${ids.join(',')}`)
}

export const requestDeleteParagraph = async (id: number, noteID: number): Promise<void> => {
  await requestDelete(`/apis/notes/${noteID}/paragraphs/${id}`)
}

export const requestSwapParagraphs = async (noteID: number, aID: number, bID: number): Promise<void> => {
  await requestPut(`/apis/notes/${noteID}/paragraphs/swap`, { aID, bID })
}

export const requestEditParagraph = async (noteID: number, paragraphID: number, content: string, referenceArticleIDs: number[], referenceWebURLs: string[]): Promise<void> => {
  await requestPut(`/apis/notes/${noteID}/paragraphs/${paragraphID}`, { content, referenceArticleIDs, referenceWebURLs })
}
