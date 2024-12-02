import { FirestoreService } from './firestore';
import type { DealStage, StageStatus, DealProgress } from '../types/deals';

export class DealProgressService {
  static async updateStage(
    dealId: string,
    stage: DealStage,
    userId: string
  ): Promise<void> {
    try {
      await FirestoreService.updateDeal(dealId, {
        'stages.current': stage,
        'metadata.updatedAt': new Date().toISOString(),
      });

      // Log activity
      await FirestoreService.logActivity({
        type: 'deal',
        action: 'stage_change',
        dealId,
        userId,
        details: {
          description: `Deal stage updated to ${stage}`,
        },
        metadata: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error updating deal stage:', error);
      throw error;
    }
  }

  static async updateStageProgress(
    dealId: string,
    stage: DealStage,
    progress: Partial<StageStatus>,
    userId: string
  ): Promise<void> {
    try {
      await FirestoreService.updateDeal(dealId, {
        [`stages.${stage}`]: progress,
        'metadata.updatedAt': new Date().toISOString(),
      });

      // Log activity
      await FirestoreService.logActivity({
        type: 'deal',
        action: 'progress_update',
        dealId,
        userId,
        details: {
          description: `Updated progress for ${stage} stage`,
          progress,
        },
        metadata: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error updating stage progress:', error);
      throw error;
    }
  }

  static async completeStage(
    dealId: string,
    stage: DealStage,
    userId: string
  ): Promise<void> {
    try {
      const now = new Date().toISOString();
      
      await FirestoreService.updateDeal(dealId, {
        [`stages.${stage}.status`]: 'completed',
        [`stages.${stage}.completedAt`]: now,
        [`stages.${stage}.completionPercentage`]: 100,
        'metadata.updatedAt': now,
      });

      // Log activity
      await FirestoreService.logActivity({
        type: 'deal',
        action: 'stage_completed',
        dealId,
        userId,
        details: {
          description: `Completed ${stage} stage`,
        },
        metadata: {
          timestamp: now,
        },
      });
    } catch (error) {
      console.error('Error completing stage:', error);
      throw error;
    }
  }

  static subscribeToProgress(
    dealId: string,
    callback: (progress: DealProgress) => void
  ): () => void {
    return FirestoreService.subscribeToDeal(dealId, (deal) => {
      if (!deal) return;

      const progress: DealProgress = {
        currentStage: deal.stages.current,
        stages: deal.stages,
        lastUpdated: deal.metadata.updatedAt,
        updatedBy: deal.metadata.updatedBy,
      };

      callback(progress);
    });
  }
}