import chalk from 'chalk';

/**
 * @description Prints your error in red to stderr and terminate the program
 *
 * @param { string } message Your message
 */
export const error = ( message : string ) =>
{
	console.error(`\n ${ chalk.red( message )} \n`);
	process.exit(0);
}