import 'package:flutter_test/flutter_test.dart';
import 'package:dayflow/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const DayFlowApp());
    expect(find.text('DayFlow'), findsAny);
  });
}
