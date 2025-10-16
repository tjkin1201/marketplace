#!/usr/bin/env node
import { Command } from 'commander';
import { Marketplace } from './marketplace';

const program = new Command();

program
  .name('plugin')
  .description('Claude Plugin Marketplace CLI')
  .version('1.0.0');

const marketplaceCommand = program
  .command('marketplace')
  .description('Manage the plugin marketplace');

marketplaceCommand
  .command('add <owner/repo>')
  .description('Add a plugin to the marketplace')
  .action((ownerRepo: string) => {
    try {
      const marketplace = new Marketplace();
      marketplace.addPlugin(ownerRepo);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
    }
  });

marketplaceCommand
  .command('list')
  .description('List all plugins in the marketplace')
  .action(() => {
    const marketplace = new Marketplace();
    const plugins = marketplace.listPlugins();
    
    if (plugins.length === 0) {
      console.log('No plugins in the marketplace yet.');
      return;
    }

    console.log('\nPlugins in marketplace:');
    plugins.forEach((plugin, index) => {
      console.log(`${index + 1}. ${plugin.owner}/${plugin.repo} (added: ${plugin.addedAt})`);
    });
  });

program.parse(process.argv);
