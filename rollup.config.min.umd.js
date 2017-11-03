import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'src/machine.js',
    format: 'umd',
    dest: './dist/machine.umd.min.js', // equivalent to --output
    plugins: [
        resolve(),
        uglify()
    ],
    moduleName: 'Machine',
    sourceMap: true
};