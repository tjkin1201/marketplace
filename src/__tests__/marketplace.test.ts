import * as fs from 'fs';
import * as path from 'path';
import { Marketplace } from '../marketplace';

const TEST_MARKETPLACE_FILE = path.join(process.cwd(), 'marketplace.json');

describe('Marketplace', () => {
  beforeEach(() => {
    // Clean up test file before each test
    if (fs.existsSync(TEST_MARKETPLACE_FILE)) {
      fs.unlinkSync(TEST_MARKETPLACE_FILE);
    }
  });

  afterEach(() => {
    // Clean up test file after each test
    if (fs.existsSync(TEST_MARKETPLACE_FILE)) {
      fs.unlinkSync(TEST_MARKETPLACE_FILE);
    }
  });

  describe('addPlugin', () => {
    it('should add a valid plugin', () => {
      const marketplace = new Marketplace();
      
      // Mock console.log to capture output
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      marketplace.addPlugin('owner/repo');
      
      expect(consoleSpy).toHaveBeenCalledWith('✓ Successfully added owner/repo to the marketplace');
      
      const plugins = marketplace.listPlugins();
      expect(plugins).toHaveLength(1);
      expect(plugins[0].owner).toBe('owner');
      expect(plugins[0].repo).toBe('repo');
      expect(plugins[0].addedAt).toBeDefined();
      
      consoleSpy.mockRestore();
    });

    it('should throw error for invalid format - no slash', () => {
      const marketplace = new Marketplace();
      
      expect(() => {
        marketplace.addPlugin('invalid-format');
      }).toThrow('Invalid format. Expected: owner/repo');
    });

    it('should throw error for invalid format - empty owner', () => {
      const marketplace = new Marketplace();
      
      expect(() => {
        marketplace.addPlugin('/repo');
      }).toThrow('Invalid format. Expected: owner/repo');
    });

    it('should throw error for invalid format - empty repo', () => {
      const marketplace = new Marketplace();
      
      expect(() => {
        marketplace.addPlugin('owner/');
      }).toThrow('Invalid format. Expected: owner/repo');
    });

    it('should throw error for duplicate plugin', () => {
      const marketplace = new Marketplace();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      marketplace.addPlugin('owner/repo');
      
      expect(() => {
        marketplace.addPlugin('owner/repo');
      }).toThrow('Plugin owner/repo already exists in the marketplace');
      
      consoleSpy.mockRestore();
    });

    it('should add multiple different plugins', () => {
      const marketplace = new Marketplace();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      marketplace.addPlugin('owner1/repo1');
      marketplace.addPlugin('owner2/repo2');
      marketplace.addPlugin('owner3/repo3');
      
      const plugins = marketplace.listPlugins();
      expect(plugins).toHaveLength(3);
      expect(plugins[0].owner).toBe('owner1');
      expect(plugins[1].owner).toBe('owner2');
      expect(plugins[2].owner).toBe('owner3');
      
      consoleSpy.mockRestore();
    });
  });

  describe('listPlugins', () => {
    it('should return empty array for new marketplace', () => {
      const marketplace = new Marketplace();
      const plugins = marketplace.listPlugins();
      
      expect(plugins).toEqual([]);
    });

    it('should persist plugins across instances', () => {
      const marketplace1 = new Marketplace();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      marketplace1.addPlugin('owner/repo');
      
      // Create a new instance to test persistence
      const marketplace2 = new Marketplace();
      const plugins = marketplace2.listPlugins();
      
      expect(plugins).toHaveLength(1);
      expect(plugins[0].owner).toBe('owner');
      expect(plugins[0].repo).toBe('repo');
      
      consoleSpy.mockRestore();
    });
  });
});
