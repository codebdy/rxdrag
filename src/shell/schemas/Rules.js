import {Container} from './grid/Container'
import {Row} from './grid/Row'
import {Column} from './grid/Column'
import {Heading} from './Heading'
import {Alert} from './Alert'

var rules = {
	container: new Container,
	row: new Row,
	col: new Column,
	heading: new Heading,
	alert: new Alert,
}

export {rules}