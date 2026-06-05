import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import sitesService from './sitesService'

const initialState = {
  loading: false,
  sites: [],
  currentSite: null,
}

export const getSites = createAsyncThunk("sites/getSites", async ({ token, programId }) => {
  const response = await sitesService.getSites(token, programId)
  return response.data
})

export const getSite = createAsyncThunk("sites/getSite", async ({ token, programId, siteId }) => {
  const response = await sitesService.getSite(token, programId, siteId)
  return response.data
})

export const createSite = createAsyncThunk("sites/createSite", async ({ token, programId, siteData }) => {
  const response = await sitesService.createSite(token, programId, siteData)
  return response.data
})

export const updateSite = createAsyncThunk("sites/updateSite", async ({ token, programId, siteId, siteData }) => {
  const response = await sitesService.updateSite(token, programId, siteId, siteData)
  return response.data
})

export const archiveSite = createAsyncThunk("sites/archiveSite", async ({ token, programId, siteId }) => {
  const response = await sitesService.archiveSite(token, programId, siteId)
  return response.data
})

const sitesSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSites.pending, (state) => { state.loading = true })
      .addCase(getSites.fulfilled, (state, action) => {
        state.sites = action.payload.sites
        state.loading = false
      })
      .addCase(getSites.rejected, (state) => { state.loading = false })

      .addCase(getSite.pending, (state) => { state.loading = true })
      .addCase(getSite.fulfilled, (state, action) => {
        state.currentSite = action.payload.site
        state.loading = false
      })
      .addCase(getSite.rejected, (state) => { state.loading = false })

      .addCase(createSite.pending, (state) => { state.loading = true })
      .addCase(createSite.fulfilled, (state, action) => {
        state.currentSite = action.payload.site
        state.loading = false
      })
      .addCase(createSite.rejected, (state) => { state.loading = false })

      .addCase(updateSite.pending, (state) => { state.loading = true })
      .addCase(updateSite.fulfilled, (state, action) => {
        state.currentSite = action.payload.site
        state.loading = false
      })
      .addCase(updateSite.rejected, (state) => { state.loading = false })

      .addCase(archiveSite.pending, (state) => { state.loading = true })
      .addCase(archiveSite.fulfilled, (state, action) => {
        state.currentSite = action.payload.site
        state.loading = false
      })
      .addCase(archiveSite.rejected, (state) => { state.loading = false })
  },
})

export default sitesSlice.reducer
