import moduleAlias from 'module-alias';

if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@config': 'dist/config',
    '@middlewares': 'dist/middlewares',
    '@controllers': 'dist/controllers',
    '@routes': 'dist/routes',
    '@services': 'dist/services',
    '@dto': 'dist/dto',
    '@utils': 'dist/utils'
  });
} else {
  moduleAlias.addAliases({
    '@config': 'src/config',
    '@middlewares': 'src/middlewares',
    '@controllers': 'src/controllers',
    '@routes': 'src/routes',
    '@services': 'src/services',
    '@dto': 'src/dto',
    '@utils': 'src/utils'
  });
}
