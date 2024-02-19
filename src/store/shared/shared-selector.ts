import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../type';

export const sharedSelector = (state: RootState) => state.shared;

export const selectedMicSelector = createSelector(sharedSelector, (shared) => shared.micInfo.selectedMic);
export const selectedCameraSelector = createSelector(sharedSelector, (shared) => shared.cameraInfo.selectedCamera);
export const selectedSpeakerSelector = createSelector(sharedSelector, (shared) => shared.speakerInfo.selectedSpeaker);
