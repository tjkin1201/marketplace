import * as fs from 'fs';
import * as path from 'path';

export interface Plugin {
  owner: string;
  repo: string;
  addedAt: string;
}

export interface MarketplaceData {
  plugins: Plugin[];
}

const MARKETPLACE_FILE = path.join(process.cwd(), 'marketplace.json');

export class Marketplace {
  private data: MarketplaceData;

  constructor() {
    this.data = this.load();
  }

  private load(): MarketplaceData {
    if (fs.existsSync(MARKETPLACE_FILE)) {
      const content = fs.readFileSync(MARKETPLACE_FILE, 'utf-8');
      return JSON.parse(content);
    }
    return { plugins: [] };
  }

  private save(): void {
    fs.writeFileSync(MARKETPLACE_FILE, JSON.stringify(this.data, null, 2));
  }

  public addPlugin(ownerRepo: string): void {
    // Validate the owner/repo format
    const parts = ownerRepo.split('/');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      throw new Error('Invalid format. Expected: owner/repo');
    }

    const [owner, repo] = parts;

    // Check if plugin already exists
    const exists = this.data.plugins.some(
      p => p.owner === owner && p.repo === repo
    );

    if (exists) {
      throw new Error(`Plugin ${owner}/${repo} already exists in the marketplace`);
    }

    // Add the plugin
    const plugin: Plugin = {
      owner,
      repo,
      addedAt: new Date().toISOString()
    };

    this.data.plugins.push(plugin);
    this.save();

    console.log(`✓ Successfully added ${owner}/${repo} to the marketplace`);
  }

  public listPlugins(): Plugin[] {
    return this.data.plugins;
  }
}
