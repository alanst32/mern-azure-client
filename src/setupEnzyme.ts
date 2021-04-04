import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Instantiate Enzyme to the project
configure({ adapter: new EnzymeAdapter() });