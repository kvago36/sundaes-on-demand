import Col from 'react-bootstrap/Col';

export default function ScoopOptions({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
}