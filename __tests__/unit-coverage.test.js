const fs = require('fs').promises;
const util = require('util');
const { exec: callbackExec } = require('child_process');
const path = require('path');

const exec = util.promisify(callbackExec);

const NPX_NYC_COMMAND =
  `npm run test:coverage`;

const connectionRegex = /connection/
const modelRegex = /(\/|\\)models(\/|\\)/;
const serviceRegex = /(\/|\\)services(\/|\\)/;
const controllerRegex = /(\/|\\)controllers(\/|\\)/;

async function readCoverageFile() {
  const COVERAGE_FILE_PATH = path.join(__dirname, '..', 'coverage', 'coverage-summary.json');
  const text = await fs.readFile(COVERAGE_FILE_PATH)
  return JSON.parse(text)
};

function summeryCoveragePerFolder(arr) {
  const summary = arr.reduce((acc, cur) => {
    acc.total += cur[1].lines.total;
    acc.covered += cur[1].lines.covered;
    return acc
  }, { total: 0, covered: 0 })
  return summary;
}

function filterPerFolder(arr, regex) {
  return arr.filter(([fileName]) => !connectionRegex.test(fileName) && regex.test(fileName))
}

function porcentage({ total, covered }) {
  return (covered / total) * 100
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const executeTests = async () => {
  try {
    await exec(NPX_NYC_COMMAND)
    await delay(5000)
  } catch (error) {
    console.log(error)
    throw 'Algum dos seus testes falhou, esse requisito só será avaliado se todos os testes passarem';
  }
};

beforeAll(async () => {
  await executeTests(NPX_NYC_COMMAND);
  coverageResults = await readCoverageFile();
  coverageResultsArr = Object.entries(coverageResults);
})

afterAll(async () => {
  await exec('rm -rf coverage .nyc_output');
});

describe('Testes das camadas Model, Service e Controller', () => {

  describe('05 - Escreva testes para cobrir 15% da camada de Model', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `models` é maior ou igual a 15%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 15;

      const modelLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex));
      expect(modelLayer.total).toBeGreaterThanOrEqual(min);
      expect(modelLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(modelLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('06 - Escreva testes para cobrir 15% da camada de Service', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `services` é maior ou igual a 15%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 15;

      const serviceLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
      expect(serviceLayer.total).toBeGreaterThanOrEqual(min);
      expect(serviceLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(serviceLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('07 - Escreva testes para cobrir 15% da camada de Controller', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `controllers` é maior ou igual a 15%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 15;

      const controllerLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
      expect(controllerLayer.total).toBeGreaterThanOrEqual(min);
      expect(controllerLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(controllerLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('10 - Escreva testes para cobrir 30% da camada de Model', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `models` é maior ou igual a 30%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 30;

      const modelLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex));
      expect(modelLayer.total).toBeGreaterThanOrEqual(min);
      expect(modelLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(modelLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('11 - Escreva testes para cobrir 30% da camada de Service', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `services` é maior ou igual a 30%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 30;

      const serviceLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
      expect(serviceLayer.total).toBeGreaterThanOrEqual(min);
      expect(serviceLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(serviceLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('12 - Escreva testes para cobrir 30% da camada de Controller', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `controllers` é maior ou igual a 30%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 30;

      const controllerLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
      expect(controllerLayer.total).toBeGreaterThanOrEqual(min);
      expect(controllerLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(controllerLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('14 - Escreva testes para cobrir 60% da camada de Model', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `models` é maior ou igual a 60%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 60;

      const modelLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, modelRegex));
      expect(modelLayer.total).toBeGreaterThanOrEqual(min);
      expect(modelLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(modelLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('15 - Escreva testes para cobrir 60% da camada de Service', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `services` é maior ou igual a 60%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 60;

      const serviceLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, serviceRegex));
      expect(serviceLayer.total).toBeGreaterThanOrEqual(min);
      expect(serviceLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(serviceLayer)).toBeGreaterThanOrEqual(max);
    });
  });

  describe('16 - Escreva testes para cobrir 60% da camada de Controller', () => {

    it('Será validado que cobertura total das linhas dos arquivos na pasta `controllers` é maior ou igual a 60%', async () => {
      expect(coverageResults.total.lines.pct).toBeGreaterThanOrEqual(0);
      expect(coverageResults.total.lines.covered).toBeGreaterThanOrEqual(0);

      const min = 0;
      const max = 60;

      const controllerLayer = summeryCoveragePerFolder(filterPerFolder(coverageResultsArr, controllerRegex));
      expect(controllerLayer.total).toBeGreaterThanOrEqual(min);
      expect(controllerLayer.covered).toBeGreaterThanOrEqual(min);
      expect(porcentage(controllerLayer)).toBeGreaterThanOrEqual(max);
    });
  });
});
