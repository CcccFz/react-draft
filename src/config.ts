import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const CONFIG_FILEPATH = 'config.yml';

export default (() => {
	return yaml.load(
		readFileSync(CONFIG_FILEPATH, 'utf8'),
	) as Record<string, any>;
})();