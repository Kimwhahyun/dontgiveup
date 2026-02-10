import 'package:flutter/material.dart';
import '../utils/theme.dart';

class AppCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final Gradient? gradient;
  final Color? backgroundColor;
  final Border? border;
  final VoidCallback? onTap;

  const AppCard({
    super.key,
    required this.child,
    this.padding,
    this.gradient,
    this.backgroundColor,
    this.border,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: padding ?? const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: gradient,
          color: gradient == null ? (backgroundColor ?? AppColors.cardBg) : null,
          borderRadius: BorderRadius.circular(20),
          border: border ?? Border.all(color: Colors.white.withValues(alpha: 0.6)),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFFB4A0C8).withValues(alpha: 0.12),
              blurRadius: 16,
              offset: const Offset(0, 2),
            ),
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 4,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: child,
      ),
    );
  }
}

class AppBadge extends StatelessWidget {
  final String text;
  final Color? color;
  final Color? textColor;

  const AppBadge({
    super.key,
    required this.text,
    this.color,
    this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
      decoration: BoxDecoration(
        color: color ?? AppColors.pastelPink,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w700,
          color: textColor ?? const Color(0xFF8B4060),
          letterSpacing: 0.3,
        ),
      ),
    );
  }
}

class AppButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  final bool fullWidth;
  final bool isDanger;

  const AppButton({
    super.key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.fullWidth = false,
    this.isDanger = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: fullWidth ? double.infinity : null,
      height: 48,
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: isDanger
              ? const LinearGradient(colors: [Color(0xFFFF6B6B), Color(0xFFEE5A24)])
              : const LinearGradient(colors: [AppColors.accentPink, AppColors.accentPurple]),
          borderRadius: BorderRadius.circular(14),
          boxShadow: [
            BoxShadow(
              color: (isDanger ? const Color(0xFFFF6B6B) : AppColors.accentPurple).withValues(alpha: 0.3),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.transparent,
            shadowColor: Colors.transparent,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          ),
          child: isLoading
              ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
              : Text(text, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.white)),
        ),
      ),
    );
  }
}

class AppInput extends StatelessWidget {
  final String label;
  final String? hint;
  final bool obscure;
  final TextEditingController? controller;
  final String? error;

  const AppInput({
    super.key,
    required this.label,
    this.hint,
    this.obscure = false,
    this.controller,
    this.error,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.textDark)),
          const SizedBox(height: 6),
          TextField(
            controller: controller,
            obscureText: obscure,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: AppColors.textPrimary),
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: TextStyle(color: AppColors.textMuted.withValues(alpha: 0.7), fontWeight: FontWeight.w500),
              filled: true,
              fillColor: Colors.white.withValues(alpha: 0.7),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide(color: AppColors.textMuted.withValues(alpha: 0.3)),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide(color: AppColors.textMuted.withValues(alpha: 0.3)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: const BorderSide(color: AppColors.accentPurple, width: 1.5),
              ),
              errorText: error,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            ),
          ),
        ],
      ),
    );
  }
}

class FloatingBubbles extends StatelessWidget {
  const FloatingBubbles({super.key});

  @override
  Widget build(BuildContext context) {
    final bubbles = [
      _BubbleData(40, const Color(0x26FFB6C1), 0.1, 0.15),
      _BubbleData(60, const Color(0x1FADD8E6), 0.75, 0.30),
      _BubbleData(30, const Color(0x26FFDAB9), 0.5, 0.60),
      _BubbleData(50, const Color(0x1ADD9EDD), 0.85, 0.70),
      _BubbleData(35, const Color(0x1F98FB98), 0.2, 0.85),
      _BubbleData(45, const Color(0x26FFFFBA), 0.6, 0.45),
    ];

    return IgnorePointer(
      child: Stack(
        children: bubbles
            .map((b) => Positioned(
                  left: MediaQuery.of(context).size.width * b.leftPct,
                  top: MediaQuery.of(context).size.height * b.topPct,
                  child: Container(
                    width: b.size,
                    height: b.size,
                    decoration: BoxDecoration(shape: BoxShape.circle, color: b.color),
                  ),
                ))
            .toList(),
      ),
    );
  }
}

class _BubbleData {
  final double size;
  final Color color;
  final double leftPct;
  final double topPct;
  _BubbleData(this.size, this.color, this.leftPct, this.topPct);
}
