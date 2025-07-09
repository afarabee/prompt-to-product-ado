export interface StoryVersion {
  id: string;
  timestamp: string;
  changeSource: 'manual-save' | 'ai-replace' | 'ai-edit' | 'ai-append' | 'initial-creation';
  storyData: {
    title: string;
    description: string;
    acceptanceCriteria: string;
    storyPointEstimate: string;
  };
  previousData?: StoryVersion['storyData'];
  changeDescription: string;
}

class VersionHistoryService {
  private readonly MAX_VERSIONS = 20;
  private readonly STORAGE_KEY = 'story-builder-versions';
  private autoSaveInterval: number | null = null;
  private lastSavedData: string = '';
  private pendingChanges = false;

  // Get current session ID for version isolation
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('story-session-id');
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('story-session-id', sessionId);
    }
    return sessionId;
  }

  private getStorageKey(): string {
    return `${this.STORAGE_KEY}-${this.getSessionId()}`;
  }

  // Get all versions for current session
  getVersions(): StoryVersion[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading versions:', error);
      return [];
    }
  }

  // Save a new version
  saveVersion(
    storyData: StoryVersion['storyData'],
    changeSource: StoryVersion['changeSource'],
    changeDescription: string
  ): string {
    const versions = this.getVersions();
    const previousData = versions.length > 0 ? versions[versions.length - 1].storyData : undefined;
    
    // Check if data actually changed
    const currentDataString = JSON.stringify(storyData);
    if (currentDataString === this.lastSavedData && changeSource === 'manual-save') {
      return ''; // No changes to save
    }

    const newVersion: StoryVersion = {
      id: `version-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      changeSource,
      storyData: { ...storyData },
      previousData,
      changeDescription
    };

    versions.push(newVersion);

    // Keep only the most recent MAX_VERSIONS
    if (versions.length > this.MAX_VERSIONS) {
      versions.splice(0, versions.length - this.MAX_VERSIONS);
    }

    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(versions));
      this.lastSavedData = currentDataString;
      this.pendingChanges = false;
      return newVersion.id;
    } catch (error) {
      console.error('Error saving version:', error);
      return '';
    }
  }

  // Get a specific version by ID
  getVersion(id: string): StoryVersion | null {
    const versions = this.getVersions();
    return versions.find(v => v.id === id) || null;
  }

  // Clear all versions (when starting over or generating new story)
  clearVersions(): void {
    try {
      localStorage.removeItem(this.getStorageKey());
      sessionStorage.removeItem('story-session-id'); // Force new session
      this.lastSavedData = '';
      this.pendingChanges = false;
      this.stopAutoSave();
    } catch (error) {
      console.error('Error clearing versions:', error);
    }
  }

  // Mark that changes are pending
  markChanges(): void {
    this.pendingChanges = true;
  }

  // Start auto-save (every 30 seconds)
  startAutoSave(getCurrentStoryData: () => StoryVersion['storyData']): void {
    this.stopAutoSave();
    
    this.autoSaveInterval = window.setInterval(() => {
      if (this.pendingChanges) {
        const currentData = getCurrentStoryData();
        const hasContent = Object.values(currentData).some(value => value.trim().length > 0);
        
        if (hasContent) {
          this.saveVersion(currentData, 'manual-save', 'Auto-saved draft');
        }
      }
    }, 30000); // 30 seconds
  }

  // Stop auto-save
  stopAutoSave(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  // Generate change description based on differences
  generateChangeDescription(
    previous: StoryVersion['storyData'],
    current: StoryVersion['storyData']
  ): string {
    const changes: string[] = [];
    
    if (previous.title !== current.title) {
      changes.push('title');
    }
    if (previous.description !== current.description) {
      changes.push('description');
    }
    if (previous.acceptanceCriteria !== current.acceptanceCriteria) {
      changes.push('acceptance criteria');
    }
    if (previous.storyPointEstimate !== current.storyPointEstimate) {
      changes.push('story points');
    }

    if (changes.length === 0) return 'No changes detected';
    if (changes.length === 1) return `Updated ${changes[0]}`;
    if (changes.length === 2) return `Updated ${changes.join(' and ')}`;
    return `Updated ${changes.slice(0, -1).join(', ')} and ${changes[changes.length - 1]}`;
  }

  // Format timestamp for display
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  // Format change source for display
  formatChangeSource(changeSource: StoryVersion['changeSource']): string {
    switch (changeSource) {
      case 'initial-creation': return 'Initial Creation';
      case 'manual-save': return 'Manual Save';
      case 'ai-replace': return 'AI Replace';
      case 'ai-edit': return 'AI Edit';
      case 'ai-append': return 'AI Append';
      default: return 'Unknown';
    }
  }
}

// Export singleton instance
export const versionHistoryService = new VersionHistoryService();
